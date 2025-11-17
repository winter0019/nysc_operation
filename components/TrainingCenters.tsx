import React, { useState } from 'react';
import { LGA, TrainingCenter } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import Input from './common/Input';

const MOCK_CENTERS: TrainingCenter[] = [
    { id: '1', name: 'Daura Digital Skills Hub', memberCount: 25, fee: 5000 },
    { id: '2', name: 'Sandamu Fashion & Design Institute', memberCount: 18, fee: 7500 },
    { id: '3', name: 'Mai\'adua Agro-Allied Farm', memberCount: 32, fee: 2000 },
];

const TrainingCenters: React.FC<{ lga: LGA }> = ({ lga }) => {
    const [centers, setCenters] = useState<TrainingCenter[]>(MOCK_CENTERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCenter, setNewCenter] = useState<Omit<TrainingCenter, 'id'>>({
        name: '',
        memberCount: 0,
        fee: 0,
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset form
        setNewCenter({ name: '', memberCount: 0, fee: 0 });
    };

    const handleSave = () => {
        if (!newCenter.name) {
            alert("Center name is required.");
            return;
        }
        const centerToAdd: TrainingCenter = {
            id: new Date().toISOString(),
            ...newCenter
        };
        setCenters([...centers, centerToAdd]);
        handleCloseModal();
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Post-Camp Training Centers (SAED)</h2>
            <Card title={`Centers in ${lga.name}`} actions={<Button onClick={handleOpenModal}>Add New Center</Button>}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Center Name</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">No. of Corps Members</th>
                                <th className="p-3 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Fee (₦)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centers.map(center => (
                                <tr key={center.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{center.name}</td>
                                    <td className="p-3 text-center">{center.memberCount}</td>
                                    <td className="p-3 text-right">{center.fee.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Training Center">
                <div className="space-y-4">
                    <Input 
                        label="Center Name" 
                        id="centerName" 
                        type="text" 
                        value={newCenter.name} 
                        onChange={(e) => setNewCenter({ ...newCenter, name: e.target.value })}
                        required
                    />
                    <Input 
                        label="Number of Corps Members" 
                        id="memberCount" 
                        type="number" 
                        value={newCenter.memberCount}
                        onChange={(e) => setNewCenter({ ...newCenter, memberCount: parseInt(e.target.value) || 0 })}
                    />
                    <Input 
                        label="Fee (₦)" 
                        id="fee" 
                        type="number" 
                        value={newCenter.fee}
                        onChange={(e) => setNewCenter({ ...newCenter, fee: parseInt(e.target.value) || 0 })}
                    />
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                        <Button onClick={handleSave}>Save Center</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TrainingCenters;