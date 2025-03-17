import MyMap from "./components/map/Map";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.page}>
			<MyMap></MyMap>
		</div>
	);
}
