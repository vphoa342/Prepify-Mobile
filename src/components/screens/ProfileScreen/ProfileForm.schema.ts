import { z } from "zod";

export const ProfileFormSchema = z.object({
    fullname: z
        .string({
            message: "Họ và tên không được để trống",
        })
        .min(1, {
            message: "Họ và tên không được để trống",
        }),
    email: z.string({
        message: "Email không hợp lệ",
    }),
    phone: z.string({
        message: "Số điện thoại không hợp lệ",
    }),
    area: z.string({
        message: "Khu vực không được để trống",
    }),
    address: z.string({
        message: "Địa chỉ không được để trống",
    }),
    identityCard: z.string({
        message: "Căn cước công dân không hợp lệ",
    }),
});
