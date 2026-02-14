import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import SlotMachine from './components/SlotMachine';
import SuggestionList from './components/SuggestionList';
import DateDetailModal from './components/DateDetailModal';
import { generateDateIdea } from './utils/geminiAPI';
import { clsx } from 'clsx';

function App() {
  const [appState, setAppState] = useState('input'); // 'input', 'spinning', 'result'
  const [formData, setFormData] = useState(null);
  const [resultData, setResultData] = useState(null); // Now an array of suggestions
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpin = async (data) => {
    setFormData(data);
    setAppState('spinning');
    setError(null);
    setSelectedDate(null);

    try {
      // Start API call in background while spinning
      // We want the spin to last at least 2.5s, but we also need the data
      // So we wait for both

      const apiPromise = generateDateIdea(data.city, data.budget, data.vibe, data.dietary);
      const minSpinTimePromise = new Promise(resolve => setTimeout(resolve, 2500));

      const [apiResult] = await Promise.all([apiPromise, minSpinTimePromise]);

      setResultData(apiResult);
      // The SlotMachine component handles the visual stopping sequence. 
      // We just need to know when it's visually "done" to show the card.

    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setAppState('input'); // Go back to input on error
    }
  };

  const handleSlotFinished = () => {
    // Called by SlotMachine when animation is effectively done
    if (resultData) {
      // Add a small delay for effectiveness
      setTimeout(() => {
        setAppState('result');
        setShowConfetti(true);
      }, 500);
    } else if (error) {
      setAppState('input');
    }
  };

  const handleSpinAgain = () => {
    setAppState('input');
    setResultData(null);
    setSelectedDate(null);
    setShowConfetti(false);
    // Optionally keep form data or clear it. 
    // Spec says "Spin Again -> Keep inputs", "New Search -> Clear inputs". 
  };

  const handleNewSearch = () => {
    setFormData(null); // Clear form? Or let InputForm handle it via key?
    setAppState('input');
    setResultData(null);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-cream pb-12">
      <Header />

      <main className="container mx-auto px-4">

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-100 border-4 border-black p-4 text-center shake">
            <p className="font-bold text-red-600">{error}</p>
          </div>
        )}

        {/* State: Input */}
        {appState === 'input' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-black font-black uppercase mb-2 text-shadow-none">
                Find Your Date
              </h2>
              <p className="text-gray-700 text-lg md:text-xl font-medium max-w-lg mx-auto">
                Tell us what you're looking for, and let fate decide the rest.
              </p>
            </div>
            <InputForm onSpin={handleSpin} />
          </div>
        )}

        {/* State: Spinning */}
        {appState === 'spinning' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-300">
            <h2 className="text-3xl md:text-5xl text-black font-black uppercase mb-8 animate-pulse text-center">
              Finding your perfect date...
            </h2>
            <SlotMachine
              isSpinning={true}
              resultReady={!!resultData}
              onFinished={handleSlotFinished}
            />
          </div>
        )}

        {/* State: Result (Suggestions List) */}
        {appState === 'result' && resultData && !selectedDate && (
          <div className="animate-in slide-in-from-bottom-8 duration-600">
            <SuggestionList
              suggestions={resultData}
              onSelect={setSelectedDate}
            />

            <div className="text-center mt-12">
              <button
                onClick={handleNewSearch}
                className="text-black underline font-bold hover:text-hot-pink transition-colors"
              >
                Start a New Search
              </button>
            </div>
          </div>
        )}

        {/* State: Result (Detailed Modal) */}
        {selectedDate && (
          <DateDetailModal
            datePlan={selectedDate}
            onClose={() => setSelectedDate(null)}
            onSpinAgain={handleSpinAgain}
          />
        )}

      </main>

      {/* Footer / Credits */}
      <footer className="text-center text-black/50 py-8 text-sm font-medium">
        <p>Built with ❤️ for date nights everywhere</p>
      </footer>
    </div>
  );
}

export default App;
