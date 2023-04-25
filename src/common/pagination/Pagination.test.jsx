import Pagination from "./Pagination"
import {create} from 'react-test-renderer';


describe('paginator component tests',()=>{
    test('pages count is 11 but should be whowed only 10',()=>{
        const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} currentPage={1} onPageChanged={()=>{}} />);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findAllByType('span');
        expect(span.length).toBe(10);
    });

    test('if pages count is more than 10 button NEXT should be present',()=>{
        const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} currentPage={1} onPageChanged={()=>{}} />);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let button = root.findAllByType('button');
        expect(button.length).toBe(1);
    });

})
