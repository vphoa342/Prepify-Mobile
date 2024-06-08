import React from "react";
import { G, Path, Svg } from "react-native-svg";
import { IconProps } from "./BaseIcon";

interface TrustFastIconProps extends IconProps {}

const TrustFastIcon: React.FC<TrustFastIconProps> = ({ ...props }) => {
    const { color, size } = props;
    return (
        <Svg
            width={size || 24}
            height={size || 24}
            color={color || "#000000"}
            viewBox="0 0 25 24"
            fill="none"
        >
            <G id="vuesax/broken/truck-fast">
                <G id="truck-fast">
                    <Path
                        id="Vector"
                        d="M12.7498 14H13.7498C14.8498 14 15.7498 13.1 15.7498 12V2H6.74976C5.24976 2 3.93977 2.82999 3.25977 4.04999"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_2"
                        d="M2.75 17C2.75 18.66 4.09 20 5.75 20H6.75C6.75 18.9 7.65 18 8.75 18C9.85 18 10.75 18.9 10.75 20H14.75C14.75 18.9 15.65 18 16.75 18C17.85 18 18.75 18.9 18.75 20H19.75C21.41 20 22.75 18.66 22.75 17V14H19.75C19.2 14 18.75 13.55 18.75 13V10C18.75 9.45 19.2 9 19.75 9H21.04L19.33 6.01001C18.97 5.39001 18.31 5 17.59 5H15.75V12C15.75 13.1 14.85 14 13.75 14H12.75"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_3"
                        d="M8.75 22C9.85457 22 10.75 21.1046 10.75 20C10.75 18.8954 9.85457 18 8.75 18C7.64543 18 6.75 18.8954 6.75 20C6.75 21.1046 7.64543 22 8.75 22Z"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_4"
                        d="M16.75 22C17.8546 22 18.75 21.1046 18.75 20C18.75 18.8954 17.8546 18 16.75 18C15.6454 18 14.75 18.8954 14.75 20C14.75 21.1046 15.6454 22 16.75 22Z"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_5"
                        d="M22.75 12V14H19.75C19.2 14 18.75 13.55 18.75 13V10C18.75 9.45 19.2 9 19.75 9H21.04L22.75 12Z"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_6"
                        d="M2.75 8H8.75"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_7"
                        d="M2.75 11H6.75"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        id="Vector_8"
                        d="M2.75 14H4.75"
                        stroke="#666666"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default TrustFastIcon;
