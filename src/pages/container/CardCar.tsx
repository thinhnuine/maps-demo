import {Card} from "antd"

export type CarType = {
  id: number
  name: string
  numberOfPassenger: number
  price: string
  url: string
}

export const CardCar = ({item}: {item: CarType}) => {
  return (
    <Card className="mt-5 border border-white cursor-pointer" key={item.id}>
      <img alt="" src={"/" + item.url} className="w-full h-[200px] object-cover bg-center" />
      <div className="flex flex-col gap-3 mt-3">
        <p>Name: {item.name}</p>
        <p>Number of passenger:{item.numberOfPassenger}</p>
        <p>Price: {item.price}</p>
      </div>
    </Card>
  )
}
