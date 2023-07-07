import {Autocomplete} from "@react-google-maps/api"
import {atom, useSetAtom} from "jotai"
import {useState} from "react"

export const positionAtom = atom({lat: 0, lng: 0})
export const CustomInput = () => {
  const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete>()
  const setPosition = useSetAtom(positionAtom)

  function onLoadAutoComplete(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete)
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace()
      if (place.geometry?.location) {
        setPosition({
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        })
      }
    }
  }

  return (
    <Autocomplete onLoad={onLoadAutoComplete} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Search for Tide Information"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: "100%",
          height: "50px",
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `16px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </Autocomplete>
  )
}
