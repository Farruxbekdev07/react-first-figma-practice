export const filterData = async () => {
    const collection_ref = collection(getDb(), collection_name)
    const q = query(collection_ref, orderBy("name"), limit(5))
    const doc_refs = await getDocs(q);

    const res = []

    doc_refs.forEach(country => {
        res.push({
            id: country.id, 
            ...country.data()
        })
    })
    console.log(res, 'filter data');
    return res;
}