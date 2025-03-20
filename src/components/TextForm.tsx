export const TextForm = () => {
  return (
    <div>
      <form>
        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
          <div className="p-4 bg-white">
            <label
              htmlFor="comment"
              className="block p-2 text-sm text-gray-700"
            >
              Enter the text you want to convert to PDF
            </label>
            <textarea
              id="comment"
              rows={16}
              className="w-full p-2 text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              placeholder="Write a text..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-center p-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-blue-800"
            >
              Convert to PDF
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
