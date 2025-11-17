import React, { useState } from 'react';
import { LGA, ClearanceRecord } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import Input from './common/Input';

interface ClearanceProps {
  lga: LGA;
}

const MOCK_CLEARANCE: ClearanceRecord[] = [
    { id: '1', month: 'June', year: 2024, cleared: 115, absent: 2 },
    { id: '2', month: 'May', year: 2024, cleared: 116, absent: 1 },
    { id: '3', month: 'April', year: 2024, cleared: 117, absent: 0 },
];

const Clearance: React.FC<ClearanceProps> = ({ lga }) => {
    const [records, setRecords] = useState<ClearanceRecord[]>(MOCK_CLEARANCE);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRecord, setNewRecord] = useState<Omit<ClearanceRecord, 'id'>>({
        month: 'July',
        year: 2024,
        cleared: 0,
        absent: 0,
    });

    const handleAddRecord = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        const recordToAdd: ClearanceRecord = {
            id: new Date().toISOString(),
            ...newRecord
        };
        setRecords([recordToAdd, ...records]);
        handleCloseModal();
    };

  return (
    <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Monthly Clearance Records</h2>
        <Card title="Clearance History" actions={<Button onClick={handleAddRecord}>Add New Record</Button>}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Month</th>
                            <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                            <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Cleared</th>
                            <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Absent</th>
                            <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map(rec => (
                            <tr key={rec.id} className="hover:bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">{rec.month}</td>
                                <td className="p-4 whitespace-nowrap text-center text-sm text-gray-600">{rec.year}</td>
                                <td className="p-4 whitespace-nowrap text-center text-lg font-bold text-green-600">{rec.cleared}</td>
                                <td className="p-4 whitespace-nowrap text-center text-lg font-bold text-red-600">{rec.absent}</td>
                                <td className="p-4 whitespace-nowrap text-center text-lg font-bold text-gray-800">{rec.cleared + rec.absent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Clearance Record">
            <div className="space-y-4">
                <Input label="Month" id="month" type="text" value={newRecord.month} onChange={(e) => setNewRecord({...newRecord, month: e.target.value })}/>
                <Input label="Year" id="year" type="number" value={newRecord.year} onChange={(e) => setNewRecord({...newRecord, year: parseInt(e.target.value) })}/>
                <Input label="Corps Members Cleared" id="cleared" type="number" value={newRecord.cleared} onChange={(e) => setNewRecord({...newRecord, cleared: parseInt(e.target.value) })}/>
                <Input label="Corps Members Absent" id="absent" type="number" value={newRecord.absent} onChange={(e) => setNewRecord({...newRecord, absent: parseInt(e.target.value) })}/>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSave}>Save Record</Button>
                </div>
            </div>
        </Modal>
    </div>
  );
};

export default Clearance;