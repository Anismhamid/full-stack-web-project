import {FunctionComponent, useEffect, useState} from "react";
import {ReceiptsType} from "../interfaces/Receipts";
import {Card, Table, Spinner} from "react-bootstrap";
import {getUsersReceipts} from "../services/Receipts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {HeeboHebrewBase64} from "../assets/fonts/heeboSansHebrew";
import {Button} from "@mui/material";

interface ReceiptProps {}

const Receipt: FunctionComponent<ReceiptProps> = () => {
	const [receipts, setReceipts] = useState<ReceiptsType[] | undefined>();

	const generatePDF = (receipt: ReceiptsType) => {
		const doc = new jsPDF({orientation: "portrait", unit: "mm", format: "a4"});

		doc.addFileToVFS("Heebo.ttf", HeeboHebrewBase64);
		doc.addFont("Heebo.ttf", "Heebo", "normal");
		doc.setFont("Heebo");
		doc.setFontSize(12);

		// אפשרות להוספת לוגו (base64 image או קישור אם מאושר)
		// doc.addImage(logoBase64, "PNG", 10, 10, 40, 20); // צריך הגדרה ל־logoBase64

		// כותרת לעסק
		doc.setFontSize(16);
		doc.text(rtlText(receipt.businessInfo.name), 200, 20, {align: "right"});

		doc.setFontSize(12);
		doc.text(rtlText(`טלפון: ${receipt.businessInfo.phone}`), 200, 28, {
			align: "right",
		});
		doc.text(`${receipt.businessInfo.email} :דו"אל`, 200, 35, {
			align: "right",
		});
		doc.text(rtlText(`כתובת: ${receipt.businessInfo.address}`), 200, 42, {
			align: "right",
		});

		// קבלה מס ותאריך
		doc.setFontSize(14);
		doc.text(rtlText(`קבלה מס' ${receipt.orderNumber}`), 200, 55, {align: "right"});

		doc.setFontSize(10);
		doc.text(
			rtlText(`תאריך: ${new Date(receipt.orderDate).toLocaleDateString("he-IL")}`),
			200,
			63,
			{align: "right"},
		);

		// פרטי לקוח
		if (receipt.customer) {
			doc.text(rtlText(`לקוח: ${receipt.customer.name.first}`), 200, 72, {
				align: "right",
			});
			doc.text(rtlText(`טלפון: ${receipt.customer.phone.phone_1}`), 200, 78, {
				align: "right",
			});
			doc.text(`${receipt.customer.email} :דו"אל`, 200, 84, {
				align: "right",
			});
			doc.text(
				rtlText(
					`כתובת: ${receipt.customer.address.city}, ${receipt.customer.address.street} ${receipt.customer.address.houseNumber}`,
				),
				200,
				90,
				{align: "right"},
			);
		}

		// טבלת מוצרים
		autoTable(doc, {
			startY: 110,
			head: [
				[
					rtlText('סה"כ'),
					rtlText("מחיר ליחידה"),
					rtlText("כמות"),
					rtlText("מוצר"),
				],
			],
			body: receipt.products.map((p) => [
				`₪ ${p.product_price.toFixed(2)} `,
				`₪ ${(p.product_price / p.quantity).toFixed(2)} `,
				p.quantity.toString(),
				rtlText(p.product_name),
			]),
			styles: {
				font: "Heebo",
				halign: "right",
				fontStyle: "normal",
			},
		});

		const finalY = (doc as any).lastAutoTable?.finalY || 130;

		// סה"כ לתשלום
		doc.setFontSize(14);
		doc.text(
			rtlText(`סה״כ לתשלום:${receipt.totalAmount.toFixed(2)} ₪ `),
			200,
			finalY + 15,
			{align: "right"},
		);

		doc.save(`receipt_${receipt.orderNumber}.pdf`);
	};

	// פונקציית עזר לטקסט מימין לשמאל
	const rtlText = (text: string): string =>
		text
			.split("\n")
			.map((line) => line.split("").reverse().join(""))
			.join("\n");

	useEffect(() => {
		getUsersReceipts()
			.then((res) => {
				setReceipts(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!receipts) {
		return (
			<div className='text-center mt-5'>
				<Spinner animation='border' variant='primary' />
				<p className='mt-3'>טוען קבלות...</p>
			</div>
		);
	}

	if (receipts.length === 0) {
		return (
			<div className='text-center mt-5'>
				<p>לא נמצאו קבלות</p>
			</div>
		);
	}

	return (
		<div className='container mt-4'>
			<h2 className='text-center mb-4'>🧾 הקבלות שלי</h2>
			{receipts.map((receipt) => (
				<div
					className='container my-5 bg-light p-3 border'
					key={receipt.orderNumber}
				>
					<Card className='mb-4 shadow-sm'>
						<Card.Header
							as='h5'
							className='text-center bg-primary text-white'
						>
							קבלה מס' {receipt.orderNumber}
						</Card.Header>
						<Card.Body>
							<Card.Text>
								<strong>תאריך:</strong>
								{new Date(receipt.orderDate).toLocaleString("he-IL", {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Card.Text>

							<Card.Text>
								{receipt.customer ? (
									<>
										<strong className='me-1'>לקוח:</strong>
										{receipt.customer.name.first}
										<br />
										<strong className='me-1'>טלפון:</strong>
										{receipt.customer.phone.phone_1}
										<br />
										<strong className='me-1'>טלפון:</strong>
										{receipt.customer.phone.phone_2 || "לא קיים"}
										<br />
										<strong className='me-1'>אימייל:</strong>{" "}
										{receipt.customer.email}
										<br />
										<strong className='me-1'>כתובת:</strong>
										{`${receipt.customer.address.city}, ${receipt.customer.address.street},
											${receipt.customer.address.houseNumber}`}
									</>
								) : (
									<span className='text-muted'>
										אין פרטי לקוח זמינים
									</span>
								)}
							</Card.Text>

							<hr />

							<Card.Text>
								<strong>שיטת תשלום:</strong>{" "}
								{receipt.payment == "true" ? "כרטיס אשראי" : "מזומן"}
							</Card.Text>
							<Card.Text>
								<strong>שיטת איסופ:</strong>{" "}
								{receipt.deliveryFee
									? `משלוח עד הבית ${receipt.deliveryFee.toLocaleString(
											"he-IL",
											{
												style: "currency",
												currency: "ILS",
											},
										)}`
									: "איסוף עצמי"}
							</Card.Text>

							<Card.Text className='fs-5 fw-bold'>
								סה״כ לתשלום:{" "}
								{receipt.totalAmount.toLocaleString("he-IL", {
									style: "currency",
									currency: "ILS",
								})}
							</Card.Text>
						</Card.Body>
					</Card>

					<h5 className='text-center'>🛒 מוצרים</h5>
					<Table striped bordered hover dir='rtl' className='mb-5'>
						<thead className='table-dark'>
							<tr>
								<th>מוצר</th>
								<th>כמות</th>
								<th>מחיר ליחידה</th>
								<th>סה"כ</th>
							</tr>
						</thead>
						<tbody>
							{receipt.products.map((p, i) => (
								<tr key={i}>
									<td>{p.product_name}</td>
									<td>{p.quantity}</td>
									<td>
										{(p.product_price / p.quantity).toLocaleString(
											"he-IL",
											{
												style: "currency",
												currency: "ILS",
											},
										)}
									</td>
									<td>
										{p.product_price.toLocaleString("he-IL", {
											style: "currency",
											currency: "ILS",
										})}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Card.Text>
						<strong>שם עסק:</strong>
						{receipt.businessInfo.name}
						<br />
						<br />
						<strong>טלפון:</strong>
						{receipt.businessInfo.phone}
						<br />
						<br />
						<strong>אימייל:</strong> {receipt.businessInfo.email}
						<br />
						<br />
						<strong>כתובת:</strong> {receipt.businessInfo.address}
					</Card.Text>

					<hr />
					<div className=''>
						<Button
							sx={{bgcolor: "Background", margin: "auto"}}
							onClick={() => generatePDF(receipt)}
						>
							הורדה כ PDF
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Receipt;
