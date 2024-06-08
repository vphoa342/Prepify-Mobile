import React from "react";
import { G, Path, Svg } from "react-native-svg";

interface BoxIconProps {
    color?: string;
    size?: number;
}
const BoxIcon: React.FC<BoxIconProps> = ({ ...props }) => {
    const { color, size } = props;
    return (
        <Svg
            width={size || 24}
            height={size || 24}
            color={color || "#000000"}
            viewBox="0 0 24 24"
            fill="none"
        >
            <G id="vuesax/broken/box">
                <G id="box">
                    <G id="Group">
                        <G id="Group_2">
                            <Path
                                id="Vector"
                                d="M3.16992 7.44006L11.9999 12.55L20.7699 7.47003"
                                stroke="#FF7B29"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                id="Vector_2"
                                d="M12 21.61V12.54"
                                stroke="#FF7B29"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </G>
                        <Path
                            id="Vector_3"
                            d="M2.38965 9.17007C2.38965 7.79007 3.37963 6.11009 4.58963 5.44009L9.92963 2.47006C11.0696 1.84006 12.9396 1.84006 14.0796 2.47006L19.4196 5.44009C20.6296 6.11009 21.6196 7.79007 21.6196 9.17007V14.8201C21.6196 16.2001 20.6296 17.8801 19.4196 18.5501L14.0796 21.5201C12.9396 22.1501 11.0696 22.1501 9.92963 21.5201L4.58963 18.5501C3.37963 17.8801 2.38965 16.2001 2.38965 14.8201V14.0001"
                            stroke="#FF7B29"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </G>
                    <Path
                        id="Vector_4"
                        d="M16.9998 13.24V9.58002L10.9297 6.07001L9.87976 5.46997L7.50977 4.09998"
                        stroke="#FF7B29"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default BoxIcon;
