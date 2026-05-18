import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useStore } from '@nanostores/react';
import { languageStore, translations } from '../store/languageStore';

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1O5iMSFZ09rzF9_soBdYynzSk9z2jUclgTCfsipCEOTw/gviz/tq?tqx=out:csv&gid=0";

const DataTable = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const lang = useStore(languageStore);
  const t = translations[lang];

  useEffect(() => {
    async function loadSheet() {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);

        if (!response.ok) {
          throw new Error("Could not load Google Sheet");
        }

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setRows(result.data);
            setLoading(false);
          },
          error: () => {
            setLoading(false);
          },
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    loadSheet();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38bdf8]"></div>
        <p className="ml-3 text-[#94a3b8]">Nalaganje podatkov...</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-20 text-[#94a3b8]">
        Podatkov ni bilo mogoče najti. Preverite, ali je Google Sheet javno dostopen.
      </div>
    );
  }

  const columnMapping = (t as any).columnMapping || {};
  
  // 1. Identify which columns have at least one non-empty value
  const activeColumns = Object.keys(rows[0] || {}).filter(column => {
    // Only keep columns that have at least one row with data
    const hasData = rows.some(row => row[column] && String(row[column]).trim() !== "");
    // Also check if it's a generic header like "_1", if so, only keep if it has data
    if (column.startsWith("_") && !isNaN(Number(column.substring(1)))) {
      return hasData;
    }
    return true;
  });

  // 2. Map generic headers to friendly names by index if necessary
  const getHeaderName = (column: string, index: number) => {
    if (columnMapping[column]) return columnMapping[column];
    
    // If we have generic headers like _1, _2, try to map by index
    const expectedHeaders = Object.values(columnMapping);
    if (column.startsWith("_") && expectedHeaders[index]) {
      return expectedHeaders[index];
    }
    
    return column;
  };

  return (
    <section className="px-6 md:px-10 pb-24 max-w-[1300px] mx-auto relative z-10">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          {t.tableTitle}
          <span className="text-[#38bdf8]">.</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-[#94a3b8] max-w-[800px] mx-auto leading-relaxed">
          {t.tableDesc}
        </p>
      </div>

      <div className="relative group">
        {/* Glow effect background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#38bdf8]/20 to-[#818cf8]/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-[#0f172a]/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#38bdf8]/10 to-transparent border-b border-white/10">
                  {activeColumns.map((column, idx) => (
                    <th key={column} className="px-8 py-6 text-xs font-black text-[#38bdf8] uppercase tracking-[0.2em] whitespace-nowrap">
                      {getHeaderName(column, idx)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="hover:bg-white/[0.03] transition-all duration-300 group/row"
                  >
                    {activeColumns.map((column, colIndex) => {
                      const value = row[column];
                      const isLink = typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
                      
                      return (
                        <td 
                          key={column} 
                          className={`px-8 py-5 text-sm ${
                            colIndex === 0 
                              ? "text-white font-bold" 
                              : "text-[#cbd5e1] font-medium"
                          } group-hover/row:text-[#38bdf8] transition-colors duration-300`}
                        >
                          {isLink ? (
                            <a 
                              href={value} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#38bdf8] hover:underline inline-flex items-center gap-1 font-bold"
                            >
                              {column.toLowerCase().includes('link') || column.toLowerCase().includes('povezava') || getHeaderName(column, colIndex).toLowerCase().includes('link') || getHeaderName(column, colIndex).toLowerCase().includes('povezava') ? (
                                <>
                                  Odpri <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </>
                              ) : value}
                            </a>
                          ) : value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#64748b] uppercase tracking-widest bg-white/5 py-2 px-4 rounded-full border border-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
          </span>
          Live Sync active
        </div>
      </div>
    </section>
  );
};

export default DataTable;
