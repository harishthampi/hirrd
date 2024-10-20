
import { z } from 'zod'
const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" ||
          file[0].type === "image/jpeg"),
      { message: "Only images are allowed" }
    ),
})
const AddCompanyDrawer = ({fetchCompanies}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });

  return (
    <div>
      
    </div>
  )
}

export default AddCompanyDrawer
