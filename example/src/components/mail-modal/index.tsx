import { useMutation } from "@apollo/client";
import { t } from "i18next";
import type { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Button, TextInput } from "verity-quik";
import type { OrderType } from "../../features/orders/types";
import { SEND_INVOICE } from "../../services/graphql/orders/mutation";

interface MailModalProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	order: OrderType;
}

interface Form {
	email: string;
}

export const MailModal: FC<MailModalProps> = ({
	visible,
	setVisible,
	order,
}) => {
	const hideModal = () => setVisible(false);

	const { control, handleSubmit, reset } = useForm<Form>({
		defaultValues: {
			email: "",
		},
	});

	const [sendMail, { loading }] = useMutation(SEND_INVOICE);
	const onSubmit = (data: Form) => {
		sendMail({
			update(_, { data: { sendInvoice } }) {
				if (sendInvoice?.success) {
					Toast.show({
						type: "success",
						text1: t("dine.success.title"),
						text2: t("dine.success.send-mail"),
					});
					hideModal();
					reset();
				}
			},
			variables: {
				email: data.email,
				orderId: order.id,
			},
		});
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={hideModal}
				contentContainerStyle={{
					backgroundColor: "white",
					padding: 20,
					width: "90%",
					alignSelf: "center",
					borderRadius: 10,
				}}
			>
				<Text variant="titleMedium">{t("dine.send-invoice-mail")}</Text>
				<TextInput
					control={control}
					name="email"
					label={t("dine.mail")}
					rules={{ required: t("dine.error.mail") }}
					autoCapitalize="none"
					keyboardType="email-address"
					autoComplete="email"
				/>

				<View style={{ marginTop: 15 }}>
					<Button loading={loading} onPress={handleSubmit(onSubmit)}>
						{t("dine.send")}
					</Button>
				</View>
			</Modal>
		</Portal>
	);
};
