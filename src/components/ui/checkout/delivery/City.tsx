import { useDebounce } from '@/hooks/useDebounce';
import { NovaPoshta } from '@/services/NovaPoshta/NovaPoshta';
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Spin, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { Item } from '../Delivery';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IAddress } from '@/types/novaposhta.interface';
import Spinner from '../../common/Spinner';

const City = () => {
	const [value, setValue] = useState('');
	const [cities, setCities] = useState<IAddress[] | []>([]);
	const [shouldShow, setShouldShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const { setCity } = useActions();
	const city = useTypedSelector((state) => state.order.city);

	const debouncedValue = useDebounce(value, 800);

	useEffect(() => {
		(async () => {
			if (debouncedValue) {
				setLoading(true);
				const response = await NovaPoshta.searchByTerm(value);
				console.log(response);

				if (response.data.length > 0) {
					setCities(response.data);
				}
				setLoading(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	return (
		<>
			<Item onClick={() => setShouldShow(true)}>
				<EnvironmentOutlined />
				<div>
					<p style={{ color: 'gray' }}>Ваше місто:</p>
					<p>{city.title || 'Оберіть місто'}</p>
				</div>
			</Item>
			<Modal
				title={
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<h3>Оберіть ваше місто</h3>
						{loading ? (
							<Spin indicator={antIcon} style={{ marginLeft: '10px' }} />
						) : (
							<></>
						)}
					</div>
				}
				open={shouldShow}
				onOk={() => setShouldShow(false)}
				onCancel={() => setShouldShow(false)}
			>
				<TreeSelect
					showSearch={true}
					style={{ width: '100%', top: 0 }}
					dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
					placeholder="City..."
					allowClear
					treeDefaultExpandAll
					value={value}
					onChange={(value) => {
						const [title, ref] = value.split('>');
						setCity({ title: title, ref: ref });
					}}
					onSearch={setValue}
					onClear={() => setCities([])}
					treeDataSimpleMode={true}
					treeData={cities.map(
						(
							{ Ref, AreaDescription, SettlementTypeDescription, Description },
							index
						) => {
							const title = `${AreaDescription}, ${SettlementTypeDescription} ${Description}`;
							return {
								id: Ref,
								pId: Description,
								key: `${title}>${Ref}`,
								value: `${title}>${Ref}`,
								title: title,
							};
						}
					)}
				/>
			</Modal>
		</>
	);
};

export default City;
