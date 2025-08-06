import Button from "@/components/Button";
import Input from "@/components/Input";
import {RadioInput} from "@/components/RadioInput";
import SelectInput from "@/components/SelectInput";
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
      isHeightInMeters: z.boolean(),
      weight: z.string().min(2, {message: t("signUp.weightZodError")}),
      isWeightInKg: z.boolean(),
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
      isHeightInMeters: undefined,
      weight: "",
      isWeightInKg: undefined,
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

  const GenderData = {
    data: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
      {
        label: "Other",
        value: "other",
      },
    ],
    title: "Gender",
    placeholder: "Select your gender",
  };

  const YesOrNoValuesHeight = [
    {id: "heightYes", label: "Sim", value: "true"},
    {id: "heightNo", label: "Não", value: "false"},
  ];

  const YesOrNoValuesWeight = [
    {id: "weightYes", label: "Sim", value: "true"},
    {id: "weightNo", label: "Não", value: "false"},
  ];

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex-1 bg-white px-7.5 py-20">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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
                  data={GenderData.data}
                  title={GenderData.title}
                  placeholder={GenderData.placeholder}
                  name="gender"
                  iconName="team"
                  iconSize={20}
                  iconColor="dark"
                />

                <RadioInput
                  items={YesOrNoValuesHeight}
                  label={"A altura é em metros?"}
                  name="isHeightInMeters"
                  required
                />

                <Input
                  name="height"
                  customInputTitle={"Altura"}
                  customPlaceholder={"Informe sua altura"}
                  keyboardType="numeric"
                  autoCorrect={false}
                  iconNameAntDesign="arrowup"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                  customMask="height"
                />

                <RadioInput
                  items={YesOrNoValuesWeight}
                  label={"O peso é em kg?"}
                  name="isWeightInKg"
                  required
                />

                <Input
                  name="weight"
                  customInputTitle={"Peso"}
                  customPlaceholder={"Informe seu peso"}
                  keyboardType="numeric"
                  autoCorrect={false}
                  iconNameAntDesign="arrowdown"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
                  customMask="weight"
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
