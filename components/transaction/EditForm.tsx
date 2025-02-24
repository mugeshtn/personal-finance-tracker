import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { MongoTransactionDatas } from "@/utils/types";
import { handleEdit } from "@/app/user/transactions/handleApi";
import { Categories } from "@/utils/constants";

interface EditFormProps {
  editedData: MongoTransactionDatas,
  setEditedData: Dispatch<SetStateAction<MongoTransactionDatas | undefined>>,
  setClose: Dispatch<SetStateAction<boolean>>
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const EditForm = ({ editedData, setEditedData, setClose, setRefresh }: EditFormProps) => {

  return (
    <Card className="fixed top-16 right-0 w-96  shadow-lg bg-white border rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Edit Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            value={editedData.amount}
            onChange={(e) => setEditedData({ ...editedData, amount: e.target.value })}
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select
            value={editedData.category}
            onValueChange={(value) => setEditedData({ ...editedData, category: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Notes</Label>
          <Input
            type="text"
            value={editedData.notes}
            onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
          />
        </div>

        <div>
          <Label>Payment Method</Label>
          <Select
            value={editedData.paymentMethod}
            onValueChange={(value) => setEditedData({ ...editedData, paymentMethod: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Account">Account</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="flex justify-between">
          <Button onClick={() => handleEdit(editedData, setRefresh, setClose)} className="bg-green-600">
            Save
          </Button>
          <Button className="bg-red-600"
            onClick={() => setClose((prev) => !prev)}
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditForm;
