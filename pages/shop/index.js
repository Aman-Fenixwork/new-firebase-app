import Shop from "../../components/shop/Shop"
import withAuth from "../../HOC/withAuth";

const ShopPage = () => {
  return (<Shop />)
}

export default withAuth(ShopPage);