import { ProfileFormSchema } from "$components/screens/ProfileScreen/ProfileForm.schema";
import StyledButton from "$components/ui/StyledButton";
import StyledTextInput from "$components/ui/StyledTextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Surface } from "react-native-paper";
import { z } from "zod";

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
const profileFormDefaulValues: ProfileFormType = {
    fullname: "",
    email: "",
    phone: "",
    identityCard: "",
    area: "",
    address: "",
};

const ProfileForm = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormType>({
        mode: "all",
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: profileFormDefaulValues,
    });

    const [isEditting, setIsEditting] = React.useState(false);

    const handleChangeInfo = (data: ProfileFormType) => {
        console.log(data);
    };

    const handleCancel = () => {
        reset();
        setIsEditting(false);
    };

    return (
        <View className="mt-6">
            <Surface className="rounded-xl p-6 relative">
                <StyledTextInput
                    control={control}
                    errors={errors}
                    label="Họ và tên"
                    name="fullname"
                    placeholder="Nguyen Van A"
                />
                <StyledTextInput
                    control={control}
                    errors={errors}
                    label="Email"
                    name="email"
                    placeholder="abc@gmail.com"
                />
                <StyledTextInput
                    control={control}
                    errors={errors}
                    label="Số điện thoại"
                    name="phone"
                    placeholder="0943617015"
                />
                <StyledTextInput
                    control={control}
                    errors={errors}
                    label="CCCD"
                    name="identityCard"
                    placeholder="12312313221123"
                />
                <StyledTextInput
                    control={control}
                    errors={errors}
                    label="Khu vực"
                    name="area"
                    placeholder="Quận 9"
                />
                <StyledTextInput
                    control={control}
                    errors={errors}
                    label="Địa chỉ"
                    name="address"
                    placeholder="Vinhomes Grand Park"
                />
            </Surface>
            <View className="flex flex-row" style={{ width: "auto" }}>
                {!isEditting ? (
                    <StyledButton onPress={() => setIsEditting(!isEditting)}>
                        Thay đổi
                    </StyledButton>
                ) : (
                    <>
                        <StyledButton onPress={() => handleCancel()}>
                            Hủy
                        </StyledButton>
                        <StyledButton onPress={handleSubmit(handleChangeInfo)}>
                            Lưu
                        </StyledButton>
                    </>
                )}
            </View>
        </View>
    );
};

export default ProfileForm;
