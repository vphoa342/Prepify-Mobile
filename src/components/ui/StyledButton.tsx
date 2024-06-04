import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { styled } from "nativewind";

const CustomButton = styled(Button); // Tailwind CSS classes

interface MyCustomButtonProps extends ButtonProps {
    children: React.ReactNode;
}

const StyledButton: React.FC<MyCustomButtonProps> = ({
    children,
    ...props
}) => {
    return (
        <CustomButton {...props} className="rounded-lg">
            {children}
        </CustomButton>
    );
};

export default StyledButton;
