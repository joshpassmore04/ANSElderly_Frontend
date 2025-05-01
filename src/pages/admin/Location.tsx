import { CreateEntity } from "../../components/CreateEntity"
import { useFormContext } from "../../components/FormContext";
import { LocationPicker } from "../../components/LocationPicker";
import { AttributePage } from "./AttributePage"

export const Location = () => {
    const { setField } = useFormContext();
    return (
        <AttributePage>
            <LocationPicker
                onSelect={([lat, lng]) => {
                    setField('latitude', lat.toString());
                    setField('longitude', lng.toString());
                }}
            />
            <CreateEntity
                entityType="Location"
                attributes={[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Longitude", name: "longitude", type: "number" },
                    { label: "Latitude", name: "latitude", type: "number" }
                ]}
                endpoint="/airport/location"
            />
        </AttributePage>
    )
}