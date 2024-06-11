import { useMutation } from "@apollo/client";
import type React from "react";
import { ActivityIndicator } from "react-native";
import { Checkbox, DataTable } from "react-native-paper";
import { READY_WAITING } from "../../../../services/graphql/wating-list/mutation";
//@ts-ignore
import type { WaitingType } from "../../types";

export const Item: React.FC<WaitingType> = ({
	id,
	customerName,
	numberOfPeople,
	isNotified,
}) => {
	const [ready, { loading }] = useMutation(READY_WAITING, {
		update(cache, { data: { readyWaiting } }) {
			if (readyWaiting?.success) {
				cache.modify({
					fields: {
						allWaitingList(existingWaitingList = [], { readField }) {
							return existingWaitingList.filter(
								(waitingListRef: any) => readField("id", waitingListRef) !== id,
							);
						},
					},
				});
			}
		},
		variables: {
			waitingId: id,
		},
	});
	return (
		<DataTable.Row>
			<DataTable.Cell>{customerName}</DataTable.Cell>
			<DataTable.Cell numeric>{numberOfPeople}</DataTable.Cell>
			<DataTable.Cell numeric>
				{loading ? (
					<ActivityIndicator />
				) : (
					<Checkbox.Android
						status={isNotified ? "checked" : "unchecked"}
						onPress={ready}
					/>
				)}
			</DataTable.Cell>
		</DataTable.Row>
	);
};
