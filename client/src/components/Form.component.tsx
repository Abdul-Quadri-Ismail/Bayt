export default function Form() {
  return (
    <form className="w-50 flex shadow-2xl justify-center mt-11 font-sand">
      <input
        type="search"
        className="bg-white -mr-12 rounded-full flex-base px-10 py-4"
        name="location"
        placeholder="Search for a location..."
      />
      <button className="rounded-full px-12 py-2  bg-500 text-white text-lg font-bold">
        Search
      </button>
    </form>
  );
}
