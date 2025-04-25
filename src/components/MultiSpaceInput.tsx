import { useRef } from 'react';


interface MultiSpaceInputProps {
    spaces: number;
}

export const MultiSpaceInput: React.FC<MultiSpaceInputProps> = ({ spaces }) => {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^[A-Za-z0-9]{1}$/.test(val)) {
            if (index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }
        e.target.value = val.slice(-1);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex gap-2">
            {Array.from({ length: spaces }, (_, i) => (
                <input
                    key={i}
                    type="text"
                    maxLength={1}
                    ref={(el) => {
                        if (el) inputsRef.current[i] = el;
                    }}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-18 h-18 text-center border border-gray-300 bg-gray-400 rounded focus:outline-none focus:ring-2 text-3xl focus:ring-blue-500"
                />
            ))}
        </div>
    );
};

