import Button from "@/components/Button";
import Input from "@/components/Input";
import {SelectInput} from "@/components/SelectInput";
import TextComponent from "@/components/TextComponent";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import z from "zod";

export default function SignUp() {
  const {t} = useTranslation();

  const signUpFormSchema = z
    .object({
      fullName: z
        .string()
        .min(1, {message: t("signUp.fullNameRequired")})
        .min(3, {message: t("signUp.fullNameTooShort")}),
      email: z.email(t("signUp.emailZodError")),
      dateOfBirth: z
        .string()
        .min(11, {message: t("signUp.dateOfBirthZodError")}),
      gender: z.enum(["male", "female", "other"]).refine(val => !!val, {
        message: t("signUp.gender"),
      }),
      height: z.string().min(4, {message: t("signUp.heightZodError")}),
      weight: z.string().min(2, {message: t("signUp.weightZodError")}),
      trainingLevel: z
        .enum(["beginner", "intermediate", "advanced"])
        .refine(val => !!val, {
          message: t("signUp.trainingLevel"),
        }),
      weeklyTrainingDays: z
        .string()
        .min(1, {message: t("signUp.weeklyMinTrainingDays")})
        .max(7, {
          message: t("signUp.weeklyMaxTrainingDays"),
        }),
      password: z.string().min(5, {message: t("signUp.passwordZodError")}),
      confirmPassword: z
        .string()
        .min(5, {message: t("signUp.confirmPasswordZodError")}),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t("signUp.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type SignUpForm = z.infer<typeof signUpFormSchema>;

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: undefined,
      height: "",
      weight: "",
      trainingLevel: undefined,
      weeklyTrainingDays: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {handleSubmit} = form;

  const handleSignUp = (data: SignUpForm) => {
    console.log("data", data);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex-1 bg-white px-7.5">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="pt-20"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
          }}>
          <View className="w-full">
            <TextComponent
              color="primaryDark"
              fontFamily="BebasNeue"
              fontWeight="Regular"
              fontSize="h3"
              customClassName="text-center">
              {t("signUp.title")}
            </TextComponent>

            <View className="mt-5">
              <FormProvider {...form}>
                <Input
                  name="fullName"
                  customInputTitle={t("signUp.fullNameCustomInputTitle")}
                  customPlaceholder={t("signUp.fullNameCustomPlaceholder")}
                  keyboardType="default"
                  autoCorrect={false}
                  iconNameAntDesign="user"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                />
                <Input
                  name="email"
                  customInputTitle={t("signUp.emailCustomInputTitle")}
                  customPlaceholder={t("signUp.emailCustomPlaceholder")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  iconNameAntDesign="mail"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                />
                <Input
                  name="dateOfBirth"
                  customInputTitle={t("signUp.dateOfBirthCustomInputTitle")}
                  customPlaceholder={t("signUp.dateOfBirthCustomPlaceholder")}
                  keyboardType="numeric"
                  autoCorrect={false}
                  iconNameAntDesign="calendar"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                  customMask="birthDate"
                />

                <SelectInput
                  name="scope"
                  options={[]}
                  onChange={() => {}}
                  label={"Teste"}
                  required={true}
                />

                <Input
                  name="password"
                  customInputTitle={t("signUp.passwordCustomInputTitle")}
                  customPlaceholder={t("signUp.passwordCustomPlaceholder")}
                  keyboardType="default"
                  secureTextEntry
                  iconNameAntDesign="lock"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                />
                <Input
                  name="confirmPassword"
                  customInputTitle={t("signUp.confirmPasswordCustomInputTitle")}
                  customPlaceholder={t(
                    "signUp.confirmPasswordCustomPlaceholder",
                  )}
                  keyboardType="default"
                  secureTextEntry
                  iconNameAntDesign="lock"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                />
              </FormProvider>
            </View>

            <View className="w-full mt-5">
              <Button
                text={t("signUp.submitButton")}
                onPress={() => handleSubmit(handleSignUp)()}
                disabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
