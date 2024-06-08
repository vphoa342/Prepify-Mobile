import React from "react";
import { Chip, ChipProps } from "react-native-paper";
import { styled } from "nativewind";

const CustomChip = styled(Chip); // Tailwind CSS classes

interface MyCustomChipProps extends ChipProps {
    children: React.ReactNode;
}

const StyledChip: React.FC<MyCustomChipProps> = ({ children, ...props }) => {
    return (
        <CustomChip {...props} className="rounded-sm p-0">
            {children}
        </CustomChip>
    );
};

export default StyledChip;
