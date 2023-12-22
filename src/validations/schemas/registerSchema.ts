import { PHONE_REGEX } from "@/constants/common";
import * as yup from "yup";

const registerSchema = yup.object({
  password: yup
    .string()
    .min(5, "Ít nhất 5 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Mật khẩu không được bỏ trống."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Mật khẩu nhập lại không giống.")
    .required("Vui lòng nhập lại mật khẩu"),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
});

export default registerSchema;
