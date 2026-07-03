"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "@emotion/styled";


const contactSchema = z.object({
  name: z
    .string()
    .min(1, "お名前は必須です")
    .refine((value) => value.trim() !== "", { message: "スペースのみの入力は許可されていません" }),
  phone: z.string().regex(/^[0-9-]+$/, "電話番号は半角数字で入力してください"),
  email: z
    .string()
    .email("メールアドレスの形式が正しくありません")
    .refine((value) => value.trim() !== "", { message: "メールアドレスは必須です" }),
  privacyPolicy: z.boolean().refine((value) => value === true, { message: "プライバシーポリシーに同意する必要があります" }),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function Example2Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onChange", // フォーカスが外れたタイミングでバリデーションを実行
  });
  const onSubmit = async (data: ContactInput) => {
    // APIへの送信ロジックなど
    console.log(data);
  };

  return (
    <PageContainer>
      <FormTitle>Contact Us</FormTitle>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)} css={{
          width: "100%",
        }}>
          <FormItem>
            <FormLabel htmlFor="name">名前</FormLabel>
            <FormInput
              type="text"
              id="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined} required
              {...register("name")} />
            {errors.name && <ErrorMessage id="name-error">{errors.name.message}</ErrorMessage>}
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="phone">電話番号</FormLabel>
            <FormInput
              type="tel"
              id="phone"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined} required
              {...register("phone")} />
            {errors.phone && <ErrorMessage id="phone-error">{errors.phone.message}</ErrorMessage>}
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              id="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined} required
              {...register("email")} />
            {errors.email && <ErrorMessage id="email-error">{errors.email.message}</ErrorMessage>}
          </FormItem>
          <FormItem>
            <FormLabel >
              <FormInput
                type="checkbox"
                required
                aria-invalid={errors.privacyPolicy ? "true" : "false"}
                aria-describedby={errors.privacyPolicy ? "privacy-error" : undefined}
                {...register("privacyPolicy")} />
              プライバシーポリシーに同意する
            </FormLabel>
            {errors.privacyPolicy && <ErrorMessage id="privacy-error">{errors.privacyPolicy.message}</ErrorMessage>}
          </FormItem>
          <FormItem>
            <FormButton type="submit" disabled={errors.name || errors.phone || errors.email || errors.privacyPolicy ? true : false}>送信</FormButton>
          </FormItem>
        </form>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing(6)} ${props => props.theme.spacing(2.5)};
`;

const FormTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing(2)};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  padding: ${props => props.theme.spacing(6)} ${props => props.theme.spacing(2.5)};
`;
const FormItem = styled.div`
  margin-bottom: ${props => props.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
    &:has(input[type="checkbox"]) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: ${props => props.theme.spacing(2)};
      margin-bottom: ${props => props.theme.spacing(2)};
    input[type="checkbox"] {
      margin-top: 0;
    }
  }
`;
const FormLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSizes.md};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing(1)};
  line-height: 1;
`;
const FormInput = styled.input`
  padding: ${props => props.theme.spacing(1)};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: ${props => props.theme.typography.fontSizes.md};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  margin-top: ${props => props.theme.spacing(1)};
`;
const FormButton = styled.button`
  padding: ${props => props.theme.spacing(2)};
  border: none;
  border-radius: 4px;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.primary};
  transition: all 0.2s;
  margin-top: ${props => props.theme.spacing(2)};
  cursor: pointer;
  &:hover&:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryHover};
  }
  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
    
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin-top: ${props => props.theme.spacing(1.5)};
  margin-bottom: ${props => props.theme.spacing(0)};
`;
