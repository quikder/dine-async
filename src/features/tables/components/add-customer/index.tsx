import { useMutation } from "@apollo/client";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { Modal, Portal, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Button, TextInput } from "verity-quik";
import { ADD_TO_WAITING_LIST } from "../../../../services/graphql/wating-list/mutation";
import { ALL_WAITING_LIST } from "../../../../services/graphql/wating-list/query";

export const AddCustomer: React.FC<Props> = ({
	restaurantId,
	visible,
	hideModal,
}) => {
	const containerStyle = {
		backgroundColor: "white",
		padding: 20,
		marginHorizontal: 16,
		borderRadius: 5,
	};

	const { control, reset, handleSubmit } = useForm<FormType>({
		defaultValues: {
			customerName: "",
			numberOfPeople: "",
		},
	});

	const [add, { loading }] = useMutation(ADD_TO_WAITING_LIST, {
		update(cache, { data: { addCustomerToWaitingList } }) {
			if (addCustomerToWaitingList?.success) {
				Toast.show({
					type: "success",
					text1: t("dine.success.title"),
					text2: t("dine.success.waiting"),
				});
				reset();
				hideModal();

				const data: any = cache.readQuery({
					query: ALL_WAITING_LIST,
					variables: { restaurantId },
				});

				if (data) {
					const { allWaitingList } = data;

					const exist = allWaitingList.findIndex(
						(item: any) => item.id === addCustomerToWaitingList.waitingList.id,
					);

					if (exist < 0) {
						cache.writeQuery({
							query: ALL_WAITING_LIST,
							variables: { restaurantId },
							data: {
								allWaitingList: [
									...allWaitingList,
									addCustomerToWaitingList.waitingList,
								],
							},
						});
					}
				}
			}
		},
	});
	const onSubmit = (data: FormType) => {
		add({
			variables: {
				restaurantId,
				customerName: data.customerName,
				numberOfPeople: Number.parseInt(data.numberOfPeople),
			},
		});
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={hideModal}
				contentContainerStyle={containerStyle}
				style={{ justifyContent: "flex-start" }}
			>
				<Text variant="titleMedium">{t("dine.add-customer-to-waiting")}</Text>

				<TextInput
					control={control}
					name="customerName"
					rules={{
						required: t("dine.error.customerName"),
					}}
					label={t("dine.customer-name")}
				/>

				<TextInput
					control={control}
					name="numberOfPeople"
					rules={{
						required: t("dine.error.number-people"),
						min: {
							value: 1,
							message: t("dine.number-people-min"),
						},
					}}
					label={t("dine.number-people")}
					useKeyboardAccesory
					keyboardType="numeric"
				/>

				<Button
					style={{ marginTop: 15 }}
					loading={loading}
					onPress={handleSubmit(onSubmit)}
				>
					{t("dine.add")}
				</Button>
			</Modal>
		</Portal>
	);
};

interface Props {
	restaurantId: string;
	visible: boolean;
	hideModal: () => void;
}

interface FormType {
	customerName: string;
	numberOfPeople: string;
}
