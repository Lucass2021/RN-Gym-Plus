import TextComponent from "@/components/TextComponent";
import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Button from "@/components/Button";

const signInFormSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(5, {message: "Informe sua senha"}),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export default function SignIn() {
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

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex-1 bg-white px-7.5 pt-20">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
          }}>
          <TextComponent
            color="primary"
            fontFamily="BebasNeue"
            fontWeight="Regular"
            fontSize="h3"
            customClassName="text-center">
            Sign in to continue
          </TextComponent>

          <FormProvider {...form}>
            <Input
              name="email"
              customInputTitle="E-mail"
              customPlaceholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
            />
            <Input
              name="password"
              customInputTitle="Senha"
              customPlaceholder="Digite sua senha"
              keyboardType="default"
              secureTextEntry
            />
          </FormProvider>

          <View className="w-full">
            <Button
              text="Entrar"
              onPress={() => handleSubmit(handleSignIn)()}
              disabled={false}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
