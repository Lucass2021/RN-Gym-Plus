import Button from "@/components/Button";
import Input from "@/components/Input";
import TextComponent from "@/components/TextComponent";
import {zodResolver} from "@hookform/resolvers/zod";
import {router} from "expo-router";
import {FormProvider, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import {z} from "zod";

export default function SignIn() {
  const {t} = useTranslation();
  const signInFormSchema = z.object({
    email: z.email(t("auth.emailZodError")),
    password: z.string().min(5, {message: t("auth.passwordZodError")}),
  });

  type SignInForm = z.infer<typeof signInFormSchema>;

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {handleSubmit} = form;

  const handleSignIn = async (data: SignInForm) => {
    console.log("data", data);

    // router.replace("");
  };

  const handleForgotPassword = () => {
    console.log("handleForgotPassword");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex-1  bg-white px-7.5 pt-40 pb-14">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View className="w-full">
            <TextComponent
              color="primaryDark"
              fontFamily="BebasNeue"
              fontWeight="Regular"
              fontSize="h3"
              customClassName="text-center">
              {t("auth.title")}
            </TextComponent>

            <FormProvider {...form}>
              <Input
                name="email"
                customInputTitle={t("auth.emailCustomInputTitle")}
                customPlaceholder={t("auth.emailCustomPlaceholder")}
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
                customInputTitle={t("auth.passwordCustomInputTitle")}
                customPlaceholder={t("auth.passwordCustomPlaceholder")}
                keyboardType="default"
                secureTextEntry
                iconNameAntDesign="lock"
                iconSizeAntDesign={20}
                iconColorAntDesign="dark"
              />

              <Pressable
                onPress={() => handleForgotPassword()}
                className="self-end">
                <TextComponent
                  color="dark"
                  fontFamily="Inter"
                  fontWeight="SemiBold"
                  fontSize="paragraphOne">
                  {t("auth.forgorPassword")}
                </TextComponent>
              </Pressable>
            </FormProvider>

            <View className="w-full mt-5">
              <Button
                text={t("auth.submitButton")}
                onPress={() => handleSubmit(handleSignIn)()}
                disabled={false}
              />
            </View>
          </View>

          <Pressable onPress={() => router.push("/auth/sign-up")}>
            <TextComponent
              color="dark"
              fontFamily="Inter"
              fontWeight="Regular"
              fontSize="subtitleOne"
              customClassName="text-center">
              {t("auth.sign-up-text-one")}{" "}
              <TextComponent
                color="primaryDark"
                fontFamily="Inter"
                fontWeight="Regular"
                fontSize="subtitleOne"
                customClassName="underline">
                {t("auth.sign-up-text-two")}
              </TextComponent>
            </TextComponent>
          </Pressable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
