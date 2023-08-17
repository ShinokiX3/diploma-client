import { Radio, RadioChangeEvent, Select, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { NovaPoshta as NovaPoshtaApi } from '@/services/NovaPoshta/NovaPoshta';
import { Item } from '../Delivery';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styled from 'styled-components';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useActions } from '@/hooks/useActions';
import { ISelectedCity } from '@/store/order/order.types';
import { IAddress } from '@/types/novaposhta.interface';

export interface IDeliveryWrapper {
	deliveryWay: number;
	value: number;
	title: string;
	children: React.ReactNode;
}

const Wrapper: React.FC<IDeliveryWrapper> = ({
	deliveryWay,
	value,
	title,
	children,
}) => {
	return (
		<>
			{deliveryWay !== value ? (
				<Radio value={value} style={{ paddingLeft: '15px' }}>
					{title}
				</Radio>
			) : (
				<Item
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'initial',
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Radio value={value}>{title}</Radio>
						<p>{`За тарифами перевізника`}</p>
					</div>
					<div>{children}</div>
				</Item>
			)}
		</>
	);
};

interface IDeliveryWay {
	city: { title: string; ref: string };
	deliveryWay: number;
}

type TReception = {
	day: string;
	hours: string;
};

interface IMap {
	[key: string]: string | undefined;
}

const DepartmentDetails = styled.div`
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: center;
`;

const ReceptionsWrapper = styled.div``;

const ReceptionItem = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	margin-bottom: 5px;

	&:last-child {
		margin-bottom: 0px;
	}
`;

const NovaPoshta: React.FC<IDeliveryWay> = ({ city, deliveryWay }) => {
	const [data, setData] = useState<IAddress[]>([]);
	const [selected, setSelected] = useState<string>('');

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAyJQV-jP5bxTFg5AFE5MC0pQyZXGUoWcs',
	});

	const devDep = useTypedSelector((state) => state.order);

	const selectedInfo: IAddress | undefined = useMemo(() => {
		if (data.length > 0) return data.find((item) => item.Ref === selected);
	}, [selected, data]);

	const reception = useMemo(() => {
		const obj: IMap | undefined = selectedInfo?.Reception;
		const result = [];
		for (const key in obj) {
			result.push({ day: key, hours: obj[key] });
		}
		return result;
	}, [selectedInfo]);

	const { setDeliveryDepartment } = useActions();

	useEffect(() => {
		(async () => {
			const response = await NovaPoshtaApi.searchDepartment(city.ref);
			setData(response.data);
		})();
	}, [city]);

	useEffect(() => {
		if (selectedInfo !== undefined) {
			setDeliveryDepartment({
				title: selectedInfo.Description,
				ref: selectedInfo.Ref,
			});
		}
	}, [selectedInfo]);

	type TOption = {
		value: string;
		title: string;
	};

	const handleChange = (value: string, option: any) => {
		if (typeof option?.title === 'string') setSelected(option.title);
	};

	return (
		<Wrapper deliveryWay={deliveryWay} value={1} title="Нова Пошта">
			<Select
				defaultValue="Оберіть відділення..."
				style={{ width: '100%', maxWidth: '' }}
				onChange={(value, option) => handleChange(value, option)}
				options={data?.map((item) => ({
					value: item.Description.substring(0, 35) + '..',
					title: item.Ref,
				}))}
			/>
			<DepartmentDetails>
				<ReceptionsWrapper>
					{reception.map((item) => (
						<ReceptionItem key={item.day}>
							<p>{item.day}</p>
							<p>{item.hours}</p>
						</ReceptionItem>
					))}
				</ReceptionsWrapper>
				{/* <div>
					<GoogleMap
						zoom={10}
						center={{ lat: 44, lng: -80 }}
						mapContainerStyle={{ width: '250px', height: '250px' }}
					/>
				</div> */}
			</DepartmentDetails>
		</Wrapper>
	);
};

const UkrPoshta: React.FC<IDeliveryWay> = ({ city, deliveryWay }) => {
	return (
		<Wrapper deliveryWay={deliveryWay} value={2} title="Укрпошта">
			In development...
		</Wrapper>
	);
};

const Type = () => {
	const [deliveryWay, setDeliveryWay] = useState(0);
	const city = useTypedSelector((state) => state.order.city);

	const settings = useMemo(() => ({ city, deliveryWay }), [city, deliveryWay]);

	const handleDeliveryType = (e: RadioChangeEvent) => {
		setDeliveryWay(e.target.value);
	};

	return (
		<Radio.Group
			onChange={handleDeliveryType}
			value={deliveryWay}
			style={{ width: '100%' }}
		>
			<Space direction="vertical" style={{ width: '100%' }}>
				<NovaPoshta {...settings} />
				{/* <UkrPoshta {...settings} /> */}
			</Space>
		</Radio.Group>
	);
};

export default Type;
