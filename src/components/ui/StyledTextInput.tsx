import React from "react";
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
    get,
} from "react-hook-form";
import { View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";

interface StyledTextInputProps<T extends FieldValues> {
    label: string;
    placeholder?: string;
    name: Path<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
}

const StyledTextInput = <T extends FieldValues>({
    label,
    name,
    placeholder,
    control,
    errors,
}: StyledTextInputProps<T>) => {
    const error = get(errors, name);
    return (
        <>
            <Text className="text-gray-700">{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className="h-8 mt-1 text-sm"
                        dense={true}
                        placeholder={placeholder}
                        mode="outlined"
                        outlineStyle={{ borderRadius: 4 }}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {error ? (
                <HelperText type="error" visible={error ? true : false}>
                    {error?.message}
                </HelperText>
            ) : (
                <View className="mb-3"></View>
            )}
        </>
    );
};

export default StyledTextInput;
