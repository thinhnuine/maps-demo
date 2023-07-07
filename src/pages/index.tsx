import React, {useEffect, useRef, useState} from "react"
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api"
import {CustomInput, positionAtom} from "./container/CustomInput"
import {useAtomValue} from "jotai"
import {Card} from "antd"
import {CarType, CardCar} from "./container/CardCar"
const containerStyle = {
  width: "100%",
  height: "100vh",
}

const center = {
  lat: 21.00187585447847,
  lng: 105.8229157865053,
}

const data = [
  {
    id: 1,
    lat: 21.001976015497487,
    lng: 105.82158541095238,
    label: "$800/10h",
    url: "marker-1.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 2,
    lat: 21.003247162534965,
    lng: 105.82842784314839,
    label: "$900/4h",
    url: "marker-2.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 3,
    lat: 21.00733363997899,
    lng: 105.83074527153092,
    label: "$10/1h",
    url: "marker-3.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 4,
    lat: 21.00188497851894,
    lng: 105.8157249023849,
    label: "$1000/10h",
    url: "marker-1.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 5,
    lat: 20.99719518830571,
    lng: 105.8251250464011,
    label: "$400/4h",
    url: "marker-2.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 6,
    lat: 20.997425615120573,
    lng: 105.81749972881452,
    label: "$300/3h",
    url: "marker-3.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 7,
    lat: 21.004651124003946,
    lng: 105.82653070013531,
    label: "$500/2h",
    url: "marker-3.png",
    urlSelected: "marker-selected.png",
  },
  {
    id: 8,
    lat: 21.006421675755917,
    lng: 105.82936190176676,
    label: "$550/2h",
    url: "marker-1.png",
    urlSelected: "marker-selected.png",
  },
]

const cars: CarType[] = Array(4)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: `Car-${index + 1}`,
    numberOfPassenger: index + 1,
    price: `${index + 1}000`,
    url: `car-${index + 1}.jpg`,
  }))

function MyComponent() {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC3xMoM7Pr_5UAmLUSaiB8p5ga5TOg0lEM",
    libraries: ["places"],
  })

  const position = useAtomValue(positionAtom)
  const mapRef = useRef<google.maps.Map>()
  const [selected, setSelected] = useState(0)
  const [hoverId, setHoverId] = useState(0)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    map.setZoom(15)
    mapRef.current = map
  }, [])

  useEffect(() => {
    if (!mapRef.current || !position) return
    mapRef.current.setCenter({
      lat: position.lat,
      lng: position.lng,
    })
    mapRef.current.setZoom(15)
  }, [position])

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    if (mapRef?.current) {
      mapRef.current = undefined
    }
  }, [])

  return isLoaded ? (
    <div className="flex h-[100vh]">
      <div className="flex-shrink-0 w-[500px] px-5 py-2 overflow-y-scroll">
        <CustomInput />

        {!!selected
          ? cars.filter((item) => item.id === selected).map((item) => <CardCar item={item} key={item.id} />)
          : cars.map((item) => (
              <Card
                className="mt-5 border border-white cursor-pointer"
                key={item.id}
                onMouseOver={() => {
                  setHoverId(item.id)
                }}
                onMouseLeave={() => setHoverId(0)}
              >
                <img alt="" src={"/" + item.url} className="w-full h-[200px] object-cover bg-center" />
                <div className="flex flex-col gap-3 mt-3">
                  <p>Name: {item.name}</p>
                  <p>Number of passenger:{item.numberOfPassenger}</p>
                  <p>Price: {item.price}</p>
                </div>
              </Card>
            ))}
      </div>
      <GoogleMap
        options={{mapTypeControl: false, fullscreenControl: false, streetViewControl: false}}
        mapContainerStyle={containerStyle}
        zoom={1}
        center={center}
        onLoad={(map: google.maps.Map) => onLoad(map)}
        onClick={() => setSelected(0)}
        onUnmount={onUnmount}
      >
        <>
          {data.map((item) => (
            <Marker
              key={item.lat}
              position={{lat: item.lat, lng: item.lng}}
              onClick={() => {
                setSelected(item.id)
              }}
              icon={{
                url: selected === item.id || hoverId === item.id ? item.urlSelected : item.url,
              }}
              label={{
                text: item.label,
                fontWeight: "bold",
                fontSize: "12px",
                color: selected === item.id ? "#fff" : "#000",
                className: "ml-[30px]",
              }}
            />
          ))}
          {position.lat && <Marker position={{lat: position.lat, lng: position.lng}} />}
        </>
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)
