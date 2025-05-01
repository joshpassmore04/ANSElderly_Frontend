import { useState } from 'react';
import { TextInput } from './TextInput';
import { makeBackendRequest } from '../util/Request';
import { PopupActionButton } from './PopupActionButton';
import { FlightAttributeAction } from '../util/FlightAttributeAction';
import { useQuery, useQueryClient } from '@tanstack/react-query';


interface Attribute {
    label: string;
    name: string;
    type: string;
}

interface CreateEntityProps {
    entityType: string;
    attributes: Attribute[];
    endpoint: string;
}

export const CreateEntity: React.FC<CreateEntityProps> = ({ entityType, attributes, endpoint }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const queryClient = useQueryClient();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const { data: existingItems, isLoading, error } = useQuery({
        queryKey: [endpoint],
        queryFn: async () => {
            const data = await makeBackendRequest<any>(endpoint, null, false);
            return data.items ?? []; // or whatever key holds the array
        }
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Add the action to the form data
        const formDataWithAction = { ...formData, action: FlightAttributeAction.CREATE };

        try {
            await makeBackendRequest(endpoint, formDataWithAction, true);
            setMessage(`${entityType} created successfully.`);
            queryClient.invalidateQueries({ queryKey: [endpoint] }); // ⬅ Refresh data
        } catch (error) {
            console.error("Request failed:", error);
            setMessage(`Failed to create ${entityType}.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <p className="text-3xl font-semibold">Create a {entityType}</p>

            {/* Existing Entities */}
            {isLoading && <p className="text-sm text-gray-500 mt-2">Loading existing {entityType}s...</p>}
            {error && <p className="text-sm text-red-500 mt-2">Failed to load existing {entityType}s.</p>}

            {existingItems && existingItems.length > 0 && (
                <>
                    <p className="text-xl font-semibold p-5">
                        Existing {entityType}s
                    </p>
                    <div className="w-full max-w-4xl mt-4 mb-6 bg-gray-700 rounded-xl p-4 shadow-sm overflow-auto max-h-[30vh]">
                        <table className="w-full text-sm text-white table-auto">
                            <thead>
                                <tr>
                                    {attributes.map(attr => (
                                        <th key={attr.name} className="text-left font-semibold px-2 py-1 border-b border-gray-500">
                                            {attr.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {existingItems.map((item: any, index: number) => (
                                    <tr key={index} className="hover:bg-gray-300">
                                        {attributes.map(attr => (
                                            <td key={attr.name} className="px-2 py-1">
                                                {item[attr.name] ?? "—"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}



            {/* Form to create new entity */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4 w-full max-w-md">
                {attributes.map((attr) => (
                    <div key={attr.name} className="flex flex-col">
                        <label htmlFor={attr.name} className="font-medium">{attr.label}</label>
                        <TextInput
                            id={attr.name}
                            name={attr.name}
                            type={attr.type}
                            value={formData[attr.name] || ""}
                            onChange={handleInputChange}
                            required
                            password={attr.type === "password"}
                        />
                    </div>
                ))}
                <PopupActionButton
                    text={loading ? "Creating..." : `Create ${entityType}`}
                    type="submit"
                    bgColor="bg-green-500"
                    bgHover="bg-green-600"
                />
                {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
        </div>
    );

};
