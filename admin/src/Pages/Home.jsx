import { useSelector } from "react-redux";

export default function Home() {
    const auth = useSelector(store=>store.auth)
    console.log(auth)
  return <div>Home</div>;
}
