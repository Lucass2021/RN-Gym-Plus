import Button from "@/components/Button";
import Input from "@/components/Input";
import TextComponent from "@/components/TextComponent";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import z from "zod";

export default function SignUp() {
  const {t} = useTranslation();

  const signUpFormSchema = z.object({
    email: z.email(t("signUp.emailZodError")),
    password: z.string().min(5, {message: t("signUp.passwordZodError")}),
    confirmPassword: z
      .string()
      .min(5, {message: t("signUp.confirmPasswordZodError")}), // Fix validation
  });

  type SignUpForm = z.infer<typeof signUpFormSchema>;

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {handleSubmit} = form;

  const handleSignUp = (data: SignUpForm) => {
    console.log("data", data);
  };

  // Outros campos:
  // Nome completo
  // Gênero (masculino, feminino, outro, prefiro não dizer)
  // Data de nascimento (para calcular idade)
  // Foto de perfil (opcional)

  // Altura (cm)
  // Peso atual (kg)
  // Objetivo (ex: ganhar massa, emagrecer, manter)
  // Nível de treino (iniciante, intermediário, avançado)
  // Frequência semanal desejada (ex: 3x/semana)

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
                  name="email"
                  customInputTitle={t("signUp.emailCustomInputTitle")}
                  customPlaceholder={t("signUp.emailCustomPlaceholder")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  iconNameAntDesign="user"
                  iconSizeAntDesign={20}
                  iconColorAntDesign="dark"
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
