import MetaLayout from '@/components/layout/MetaLayout'
import Home from '@/components/screen/home/Home'

const HomePage = () => {
    
    return (
        <MetaLayout title='Main Page' description='Main page for sales'>
            <Home />
        </MetaLayout>
    )
}

export default HomePage