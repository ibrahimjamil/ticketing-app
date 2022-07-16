import { Table } from '@mantine/core';

type TableComponentProps = {
	striped?: boolean;
	tableHead: string[];
	tableBodyData: any;
	verticalSpacing?: any;
	headLineHeight?: string;
	horizontalSpacing?: any;
};

const TableComponent = (props: TableComponentProps) => {
	const { striped, tableHead, tableBodyData, headLineHeight, verticalSpacing, horizontalSpacing } = props;

	return (
		<Table
			horizontalSpacing={horizontalSpacing}
			verticalSpacing={verticalSpacing}
			striped={striped ? striped : false}
		>
			<thead
				style={{
					lineHeight: headLineHeight ? headLineHeight : '0px',
				}}
			>
				<tr>
					{tableHead.map((headData, index) => (
						<th key={index}>{headData}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{tableBodyData.map((data: any, outerIndex: number) => {
					return (
						<tr key={outerIndex}>
							{Object.keys(data).map((keys: any, index) => {
								return (
									<td style={{ borderBottom: 'none' }} key={index}>
										{data[keys]}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default TableComponent;
