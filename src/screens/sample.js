<FlatList
    data={movies}
    keyExtractor={(item) => item.id.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
    renderItem={({ item }) => (
    <View style={styles.movieCardContainer}>
        <Text>{item.title}</Text>
    </View>
)}
    onEndReached={() => {
        if (!loadingNext) {
            setLoadingNext(true); // Indicate that we are loading the next page
            setPage((prevPage) => prevPage + 1); // Increment the page to load next page
        }
    }}
    onEndReachedThreshold={0.5} // Trigger `onEndReached` when the end of the list is within 50%
    ListFooterComponent={loadingNext ? <ActivityIndicator size="large" color="#00bcd4" /> : null} // Show loading spinner for next page
/>
