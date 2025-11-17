import React, { useState } from 'react';
import { LGA, DisciplinaryCase } from '../types';
import { generateQueryDraft } from '../services/geminiService';
import Card from './common/Card';
import Button from './common/Button';
import Spinner from './common/Spinner';
import Input from './common/Input';
import Textarea from './common/Textarea';
import LetterheadDisplay from './common/LetterheadDisplay';
import PrinterIcon from './icons/PrinterIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import ShareIcon from './icons/ShareIcon';

const MOCK_CASES: DisciplinaryCase[] = [
    { id: '1', corpMemberName: 'Adekunle Gold', offense: 'Absconded from PPA for 2 weeks', date: '2024-06-15', status: 'Queried' },
    { id: '2', corpMemberName: 'Burna Boy', offense: 'Insubordination to employer', date: '2024-05-20', status: 'Resolved' },
    { id: '3', corpMemberName: 'Chioma Nwosu', offense: 'Unauthorized journey outside the state', date: '2024-06-25', status: 'Pending' },
];

const Disciplinary: React.FC<{ lga: LGA }> = ({ lga }) => {
    const [cases, setCases] = useState<DisciplinaryCase[]>(MOCK_CASES);
    const [offense, setOffense] = useState('');
    const [corpMemberName, setCorpMemberName] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [ppa, setPpa] = useState('');
    const [lgiName, setLgiName] = useState('');
    const [generatedQuery, setGeneratedQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const isShareSupported = navigator.share !== undefined;

    const handleGenerateQuery = async () => {
        if (!offense.trim() || !corpMemberName.trim() || !stateCode.trim() || !ppa.trim() || !lgiName.trim()) {
            alert('Please fill in all fields: corps member name, state code, PPA, LGI name, and offense details.');
            return;
        }
        setIsLoading(true);
        setGeneratedQuery('');
        const result = await generateQueryDraft(offense, corpMemberName, stateCode, ppa, lga.name, lgiName);
        setGeneratedQuery(result);
        setIsLoading(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedQuery).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };
    
    const handleShare = async () => {
        if (isShareSupported) {
            try {
                await navigator.share({
                    title: `NYSC Query Letter for ${corpMemberName}`,
                    text: generatedQuery,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Disciplinary Actions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Query Letter Assistant">
                    <div className="space-y-4">
                        <Input
                            label="Corps Member Name"
                            id="corpMemberName"
                            type="text"
                            value={corpMemberName}
                            onChange={(e) => setCorpMemberName(e.target.value)}
                            placeholder="e.g., Asiya Usman"
                        />
                         <Input
                            label="State Code"
                            id="stateCode"
                            type="text"
                            value={stateCode}
                            onChange={(e) => setStateCode(e.target.value)}
                            placeholder="e.g., KT/24B/1234"
                        />
                         <Input
                            label="Place of Primary Assignment (PPA)"
                            id="ppa"
                            type="text"
                            value={ppa}
                            onChange={(e) => setPpa(e.target.value)}
                            placeholder="e.g., Government Secondary School, Daura"
                        />
                         <Input
                            label="LGI Name"
                            id="lgiName"
                            type="text"
                            value={lgiName}
                            onChange={(e) => setLgiName(e.target.value)}
                            placeholder="e.g., Mr. Ibrahim Musa"
                        />
                        <Textarea
                            label="Describe the Offense"
                            id="offense"
                            rows={4}
                            value={offense}
                            onChange={(e) => setOffense(e.target.value)}
                            placeholder="e.g., Failure to report to PPA and missing November clearance..."
                        />
                        <Button onClick={handleGenerateQuery} isLoading={isLoading}>
                            Draft Query Letter
                        </Button>
                    </div>
                </Card>

                <Card title="Generated Query Draft">
                    <div className="relative h-full">
                        {isLoading && <Spinner />}
                        {generatedQuery && !isLoading && (
                            <div className="bg-gray-100 p-2 rounded-md h-96 overflow-y-auto">
                                <LetterheadDisplay queryText={generatedQuery} />
                            </div>
                        )}
                        {!generatedQuery && !isLoading && (
                            <div className="text-center text-gray-500 p-8 h-96 flex items-center justify-center">
                                <p>The query letter draft will be displayed here on an official letterhead.</p>
                            </div>
                        )}
                        {generatedQuery && !isLoading && (
                             <div className="absolute bottom-4 right-4 flex space-x-2 no-print">
                                <Button onClick={handlePrint} icon={<PrinterIcon className="h-4 w-4"/>}>
                                    Print
                                </Button>
                                <Button variant="secondary" onClick={handleCopy} icon={<ClipboardIcon className="h-4 w-4"/>}>
                                    {isCopied ? 'Copied!' : 'Copy'}
                                </Button>
                                {isShareSupported && (
                                    <Button variant="secondary" onClick={handleShare} icon={<ShareIcon className="h-4 w-4"/>}>
                                        Share
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
            
            <div className="mt-6">
                 <Card title="Disciplinary Cases List">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Corps Member</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Offense</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map(c => (
                                    <tr key={c.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{c.corpMemberName}</td>
                                        <td className="p-3">{c.offense}</td>
                                        <td className="p-3">{c.date}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                c.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                c.status === 'Queried' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {c.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </Card>
            </div>

        </div>
    );
};

export default Disciplinary;