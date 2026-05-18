import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useStore } from '@nanostores/react';
import { languageStore, translations } from '../store/languageStore';

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1cVZPd6YAG9JtJgxDMEto1d7VcY02IgzMZZkfJYRuSWk/export?format=csv&gid=797255812";

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

  const columns = Object.keys(rows[0]);
  const columnMapping = (t as any).columnMapping || {};

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
                  {columns.map((column) => (
                    <th key={column} className="px-8 py-6 text-xs font-black text-[#38bdf8] uppercase tracking-[0.2em]">
                      {columnMapping[column] || column}
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
                    {columns.map((column, colIndex) => (
                      <td 
                        key={column} 
                        className={`px-8 py-5 text-sm ${
                          colIndex === 0 
                            ? "text-white font-bold" 
                            : "text-[#cbd5e1] font-medium"
                        } group-hover/row:text-[#38bdf8] transition-colors duration-300`}
                      >
                        {row[column]}
                      </td>
                    ))}
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
