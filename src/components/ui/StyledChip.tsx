import React from "react";
import { Chip, ChipProps } from "react-native-paper";
import { styled } from "nativewind";

const CustomChip = styled(Chip); // Tailwind CSS classes

interface MyCustomChipProps extends ChipProps {
    children: React.ReactNode;
}

const StyledChip: React.FC<MyCustomChipProps> = ({ children, ...props }) => {
    return (
        <CustomChip
            {...props}
            mode="flat"
            className="rounded-sm p-0"
            textStyle={{
                marginVertical: 0,
                fontSize: 10,
            }}
        >
            {children}
        </CustomChip>
    );
};

export default StyledChip;
