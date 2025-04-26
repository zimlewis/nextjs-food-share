'use client'
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>{pending?'Submitting':'Share meals'}</button>
    )
}

export default SubmitButton;