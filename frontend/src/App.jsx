import React from 'react';

function App() {
  const [superheroes, setSuperheroes] = React.useState([]);
  const [name, setName] = React.useState('');
  const [superpower, setSuperpower] = React.useState('');
  const [humilityScore, setHumilityScore] = React.useState('5');
  const [error, setError] = React.useState('');

  const fetchSuperheroes = async () => {
    const response = await fetch('http://localhost:3000/superheroes');
    const data = await response.json();
    setSuperheroes(data);
  };

  React.useEffect(() => {
    fetchSuperheroes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/superheroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          superpower,
          humilityScore: Number(humilityScore),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setName('');
      setSuperpower('');
      setHumilityScore('5');
      fetchSuperheroes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add superhero');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <i className="fas fa-shield-alt text-2xl text-indigo-600 mr-2"></i>
          <h1 className="text-3xl font-bold text-gray-800">Superhero Humility Tracker</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fas fa-user-plus text-indigo-600 mr-2"></i>
            Add New Superhero
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Superpower
              </label>
              <input
                type="text"
                value={superpower}
                onChange={(e) => setSuperpower(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Humility Score (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={humilityScore}
                onChange={(e) => setHumilityScore(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Superhero
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fas fa-trophy text-indigo-600 mr-2"></i>
            Superheroes by Humility
          </h2>
          
          <div className="space-y-4">
            {superheroes.map((hero, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{hero.name}</h3>
                  <p className="text-sm text-gray-600">{hero.superpower}</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Score: {hero.humilityScore}
                  </span>
                </div>
              </div>
            ))}
            
            {superheroes.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No superheroes added yet. Be the first to add one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;