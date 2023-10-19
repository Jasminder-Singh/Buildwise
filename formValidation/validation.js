import * as yup from 'yup';
const toolSchema = yup.object({
    name : yup.string().min(2,"At least 2 character").required("Name is required"),
    city : yup.string().required('City/Village is required'),
    phone : yup.string().min(10,'At least 10 digits').max(10,"At max 10 digits."),
    email : yup.string().email("Invalid email.")
})
export default toolSchema;