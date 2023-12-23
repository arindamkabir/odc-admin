import React from "react";
import { ButtonProps } from "@/types/props/Button";
import Button from "../Button";

const PrimaryButton = ({ type = "button", className = "", children, isLoading, ...props }: ButtonProps) => (
    <Button
        type={type}
        className={`btn btn-neutral ${className}`}
        {...props}
    >
        {isLoading ? <span className="loading loading-spinner"></span> : null}
        {children}
    </Button>
)

export default PrimaryButton