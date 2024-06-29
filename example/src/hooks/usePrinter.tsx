import { useLazyQuery } from "@apollo/client";
import * as Print from "expo-print";
import { capitalize } from "lodash";
import moment from "moment";
import type { OrderType } from "../features/orders/types";
import { RESTAURANT_INVOICE } from "../services/graphql/orders/query";

const styles = () => {
	const style = `
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

    html {
        box-sizing: border-box;
    }

    @media print {
        
        h1,
        h2,
        h3 {
            page-break-after: avoid;
        }
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: monospace;
        line-height: 1.5;
    }

    h1,
    h2,
    h3 {
        page-break-after: avoid;
    }

    p {
        font-size: 14px;
    }

    .body {
        width: 75mm;
        height: auto;
        padding: 20px 15px;
    }

    .information {
        width: 100%;
        text-align: center;
        margin-bottom: 5px;
    }

    .details {
        width: 100%;
        margin: 10px 0;
    }

    .row {
        display: flex;
        justify-content: space-between;
    }

    .aditional {
        width: 100%;
        text-align: center;
    }

    .food {
        width: 100%;
    }

    .content-total {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .total {
        width: "70%";
    }

    .before-payment {
        width: 100%;
        margin-top: 10px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        padding: 5px;
    }

    .payment {
        width: 100%;
        margin-top: 10px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        padding: 5px;
    }

    .payment>h4 {
        text-align: center;
    }

    .payment-agree {
        margin-top: 5px;
        text-transform: uppercase;
    }

    .qr-content {
        margin-top: 15px;
        text-align: center;
    }

    .qr-img {
        width: 50%;
        margin-top: 5px;
    }

    .footer {
        white-space: pre-line;
    }
    `;

	return style;
};
const invoiceTemplate = (restaurant: any, order: OrderType) => {
	const phoneNumber = `(${restaurant.phoneNumbers[0].number.substring(
		0,
		3,
	)}) ${restaurant.phoneNumbers[0].number.substring(
		3,
		6,
	)}-${restaurant.phoneNumbers[0].number.substring(6, 10)}`;

	const total = order.isPaid
		? order.financialDetails.totalRestaurant
		: restaurant.billSettings.stripeMobileCommission
			? order.financialDetails.totalRestaurant
			: (
					Number.parseFloat(order.financialDetails.totalRestaurant) +
					Number.parseFloat(order.financialDetails.totalRestaurant) * 0.029 +
					0.3
				).toFixed(2);

	const style = styles();
	const html = `
        <html>

        <head>
        	<meta name="viewport"
        		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        	<style>
        		${style}
        	</style>
        </head>

        <body style="text-align: center;">
        	<div class="body">
        		<section class="information">
        			<h3>${capitalize(restaurant.name)}</h3>
        			<p style="text-transform: capitalize;">${
								restaurant.address.streetAddress
							}</p>
        			<p>${capitalize(
								restaurant.address.city,
							)}, ${restaurant.address.stateProvince.toUpperCase()} ${
								restaurant.address.postalCode
							}</p>

					  <p>${phoneNumber}</p>

        		</section>

        		<section class="aditional">
        			${
								order.deliveryType === "TAKEOUT"
									? "<h4>TAKEOUT</h4>"
									: order.deliveryType === "DELIVERY"
										? "<h4>Delivery</h4>"
										: ""
							}
        			${order.inApp ? "<h4>Order in APP</h4>" : ""}
        		</section>

				<section class="details">
                    <div class="row">
                        <p>Order: #${order.id.substring(0, 8)}</p>
                        <p>${moment(order.createdAt).format("MM/DD/YY")}</p>
                    </div>
                    <div class="row">
                        <p>Server By: ${order.servedBy.name}</p>
                        <p>${moment(order.createdAt).format("HH:mm")}</p>
                    </div>
                    <div class="row">
                        <p>Customer: ${order.customerName}</p>
                    </div>
                </section>

                ${order.items
									.flatMap(
										(item: any) => `
                <secion class="food">
                    <div class="row">
                        <p>${item.quantity} ${capitalize(item.dish.name)}</p>
                        <p>$${item.total}</p>
                    </div>
                </secion>`,
									)
									.join("")}

                <div class="content-total">
                    <section class="total">
                        <div class="row">
                            <p>Subtotal</p>
                            <p>$${order.financialDetails.subtotal}</p>
                        </div>
                        <div class="row">
                            <p>Tax</p>
                            <p>$${order.financialDetails.tax}</p>
                        </div>
                        ${
													!order.isPaid
														? `<div class="row">
                            <h5>Total in cash</h5>
                            <h5>${order.financialDetails.totalRestaurant}</h5>
                        </div>`
														: ""
												}
                        <div class="row">
                            <h5>Total</h5>
                            <h5>$${total}</h5>
                        </div>

                        <!-- * SI esta pagado en efectivo -->
                        ${
													order.isPaid
														? order.payments[0]?.paymentType === "cash"
															? `<div class="row">
                            <p>Change</p>
                            <p>$${order.payments[0].cashPayment.change}</p>
                        </div>`
															: ""
														: ""
												}
                    </section>
                </div>

                ${
									!order.isPaid
										? `<section class="before-payment">
                    <p>When paying with a credit card, a 2.7% fee may be charged on top of the total order amount.</p>
                    <p>18% Gratuity = $${(
											Number.parseFloat(
												order.financialDetails.totalRestaurant,
											) * 0.18
										).toFixed(2)}</p>
                    <p>20% Gratuity = $${(
											Number.parseFloat(
												order.financialDetails.totalRestaurant,
											) * 0.2
										).toFixed(2)}</p>
                    <p>22% Gratuity = $${(
											Number.parseFloat(
												order.financialDetails.totalRestaurant,
											) * 0.22
										).toFixed(2)}</p>
                </section>`
										: ""
								}

                ${
									restaurant.billSettings.usePayQr
										? !order.isPaid
											? `<section class="qr-content">
                    <p>Scan this QR code to pay for the order without contact</p>
                    <img src="data:image/png;base64,${order.qrPayment.qrCode}" alt="CodigoQr" class="qr-img">
                </section>`
											: ""
										: ""
								}

                <div style="text-align: 'left">
                    ${
											order.isPaid
												? order?.payments[0]?.paymentType === "card"
													? `<p>********** ${order.payments[0].cardPayment.cardNumber}</p>`
													: ""
												: ""
										}
                </div>

        	</div>
        </body>

        </html>
    `;

	return html;
};

export function usePrinter(
	order: OrderType,
	restaurantId: string,
): {
	printInvoice: () => Promise<void>;
} {
	const [getInformation] = useLazyQuery(RESTAURANT_INVOICE, {
		variables: { restaurantId },
	});

	const printInvoice = async () => {
		const {
			data: { restaurantInvoice },
		} = await getInformation();

		const html = await invoiceTemplate(restaurantInvoice, order);

		try {
			await Print.printAsync({
				html,
			});
		} catch (error) {}
	};

	return { printInvoice };
}
