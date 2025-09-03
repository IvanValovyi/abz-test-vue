import * as yup from "yup";
import validator from 'validator';

const validateDimensions = (file) =>
    new Promise((resolve) => {
        if (!file) return resolve(false);
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img.width >= 70 && img.height >= 70);
        };
        img.onerror = () => resolve(false);
    });

export const userSchema = yup.object({
    name: yup.string().required("Name is required").min(2).max(60),
    email: yup.string().required("Email is required").test('is-valid-email', 'Email is invalid', value => validator.isEmail(value)),
    phone: yup.string()
        .required("Phone is required")
        .matches(/^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/, "Phone must be in format +38 (0XX) XXX-XX-XX"),
    position_id: yup.number().required("Position is required"),
    photo: yup
        .mixed()
        .required("Photo is required")
        .test("fileSize", "Photo must be ≤ 5MB", (file) => !file || file.size <= 5 * 1024 * 1024)
        .test("fileFormat", "Photo must be JPEG or JPG", (file) => !file || ["image/jpeg", "image/jpg"].includes(file.type))
        .test("fileDimensions", "Minimum size is 70x70px", validateDimensions),
});