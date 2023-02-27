<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tab 1</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 1</ion-title>
				</ion-toolbar>
			</ion-header>

			<ExploreContainer name="Tab 1 page" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
type Author = {
	name: string;
	books: string[];
};
type DataTypes = {
	author: Author;
};
export default {
	setup() {
		const author: Author = {
			name: 'John Doe',
			books: [
				'Vue 2 - Advanced Guide',
				'Vue 3 - Basic Guide',
				'Vue 4 - The Mystery'
			]
		};
		// const bar = reactive({ name: "hi" });

		return { author };
	},
	computed: {
		// a computed getter
		// publishedBooksMessage(): number {
		// 	// `this` points to the component instance
		// 	return this.author.books.length;
		// }
	}
};
</script>
