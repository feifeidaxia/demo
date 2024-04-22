import './App.css';
import { Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

function App() {
    const [id, setId] = useState("");
    const [nodeInfo, setnodeInfo] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get('https://base.mfdemo.cn/boot/sys/column/tree', {
                params: {
                    projectId: id
                }
            });
            if (response.data.code === 200) {
                const node = findObjectByIdInData(response.data.data)
                setnodeInfo(node)
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error(error.message)
        }
    };

    const findObjectByIdInData = (data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomIndex2 = Math.floor(Math.random() * data[randomIndex].children.length);

        return data[randomIndex].children[randomIndex2];
    }

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchData(); 
        }
    };
    return (
        <div className="App">
            <header className="App-header">

                <p>
                    对接以下接口，并实现一个方法可以根据任意id获取到任意节点数据。
                </p>
                <div>
                    <Input type='number' placeholder="请输入id" value={id} onChange={handleInputChange} onKeyDown={handleKeyPress} />

                </div>
                {Object.keys(nodeInfo).length > 0 && (
                    <div>
                        <h2>节点信息：</h2>
                        <pre>{JSON.stringify(nodeInfo, null, 2)}</pre>
                    </div>
                )}

                <p>
                    动画特效方向测试题：
                    选取以下网站中任意两个动画效果复现，越简单的动画要求还原度越高。
                </p>
            </header>
        </div>
    );
}

export default App;
