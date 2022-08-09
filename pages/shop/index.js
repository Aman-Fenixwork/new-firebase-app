// import Shop from "../../components/shop/Shop"
import withAuth from "@HOC/withAuth";
import dynamic from 'next/dynamic';
const Shop = dynamic(import('@components/shop/Shop'), { ssr: false })

const ShopPage = () => {
  return (<Shop />)
}

export default withAuth(ShopPage);