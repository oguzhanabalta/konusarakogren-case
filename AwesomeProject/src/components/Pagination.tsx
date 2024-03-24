import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
	// Sayfalama elemanlarını oluştur
	const renderPaginationItem = (pageNumber: number) => (
		<TouchableOpacity
			key={pageNumber}
			style={[styles.pageItem, page === pageNumber && styles.selectedPageItem]}
			onPress={() => onPageChange(pageNumber)}
			disabled={page === pageNumber}
		>
			<Text style={[styles.pageItemText, page === pageNumber && styles.selectedPageItemText]}>
				{pageNumber}
			</Text>
		</TouchableOpacity>
	);

	// Noktaları ve ilk/son sayfayı göster
	const renderDots = () => <Text style={styles.dots}>...</Text>;

	// Sayfalama elemanlarını diziye dönüştür
	const paginationItems = [];
	for (let i = 1; i <= totalPages; i++) {
		if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
			paginationItems.push(renderPaginationItem(i));
		} else if (i === 2 || i === totalPages - 1) {
			paginationItems.push(renderDots());
		}
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.navItem}
				onPress={() => onPageChange(page - 1)}
				disabled={page === 1}
			>
				<Text style={[styles.navItemText, page === 1 && styles.disabledNavItemText]}>{'<'}</Text>
			</TouchableOpacity>
			{paginationItems}
			<TouchableOpacity
				style={styles.navItem}
				onPress={() => onPageChange(page + 1)}
				disabled={page === totalPages}
			>
				<Text style={[styles.navItemText, page === totalPages && styles.disabledNavItemText]}>{'>'}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#333333',
	},
	navItem: {
		marginHorizontal: 6,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	navItemText: {
		color: '#FFFFFF',
	},
	disabledNavItemText: {
		color: '#777777',
	},
	pageItem: {
		backgroundColor: 'transparent',
		marginHorizontal: 4,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#FFFFFF',
	},
	selectedPageItem: {
		backgroundColor: '#FFFFFF',
	},
	pageItemText: {
		color: '#FFFFFF',
	},
	selectedPageItemText: {
		color: '#000000',
	},
	dots: {
		color: '#FFFFFF',
		paddingHorizontal: 8,
	},
});

export default Pagination;
